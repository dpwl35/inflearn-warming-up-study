const userID = document.getElementById('userID');
const toasts = document.querySelector('.toasts');
const copyright = document.querySelector('.copyright');
const user = document.querySelector('.user');
const projectArea = document.querySelector('.project-area');

//User not found
function toggleActiveClass() {
  if (toasts) {
    toasts.classList.add('active');

    setTimeout(() => {
      toasts.classList.remove('active');
    }, 1000);
  }
}

// 유저 Element
function userTextElement(selector, value, isLink = false) {
  const element = document.querySelector(selector);
  if (element) {
    if (isLink) {
      element.href = value;
    } else {
      element.textContent = value || 'N/A';
    }
  }
}

function userImageElement(selector, src, alt) {
  const image = document.querySelector(selector);
  if (image) {
    image.src = src;
    image.alt = alt;
  }
}

// project-list DOM 생성 함수
function createProjectListElement(project) {
  const projectList = document.createElement('li');
  projectList.className = 'project-list';

  const projectName = document.createElement('div');
  projectName.className = 'project-name';
  projectName.textContent = project.name;

  const projectInfo = document.createElement('div');
  projectInfo.className = 'project-info';

  const stars = document.createElement('div');
  stars.className = 'project-tag';
  stars.innerHTML = `Stars: <span class="project-stars">${project.stargazers_count}</span>`;

  const watchers = document.createElement('div');
  watchers.className = 'project-tag';
  watchers.innerHTML = `Watchers: <span class="project-watchers">${project.watchers_count}</span>`;

  const forks = document.createElement('div');
  forks.className = 'project-tag';
  forks.innerHTML = `Forks: <span class="project-forks">${project.forks_count}</span>`;

  projectInfo.appendChild(stars);
  projectInfo.appendChild(watchers);
  projectInfo.appendChild(forks);

  projectList.appendChild(projectName);
  projectList.appendChild(projectInfo);

  return projectList;
}

// 유저 프로필과 프로젝트 목록을 비우는 함수
function clearUserProfileAndProjects() {
  userImageElement('.user-profile-img img', '', '');
  userTextElement('.user-profile-link', '', true);
  userTextElement('.user-repos span', '');
  userTextElement('.user-gists span', '');
  userTextElement('.user-followers span', '');
  userTextElement('.user-following span', '');
  userTextElement('.user-company span', '');
  userTextElement('.user-website span', '');
  userTextElement('.user-location span', '');
  userTextElement('.user-member span', '');

  projectArea.innerHTML = '';
}

// UI 초기화
function handleError() {
  clearUserProfileAndProjects();
  toggleActiveClass();
}

// 유저 프로필 & 저장소 목록 가져오기
async function getUserProfileAndRepos(username) {
  const profileUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(profileUrl),
      fetch(reposUrl),
    ]);

    if (profileResponse.ok && reposResponse.ok) {
      const profileData = await profileResponse.json();
      const reposData = await reposResponse.json();

      userImageElement(
        '.user-profile-img img',
        profileData.avatar_url,
        profileData.login
      );
      userTextElement('.user-profile-link', profileData.html_url, true);

      userTextElement('.user-repos span', profileData.public_repos);
      userTextElement('.user-gists span', profileData.public_gists);
      userTextElement('.user-followers span', profileData.followers);
      userTextElement('.user-following span', profileData.following);
      userTextElement('.user-company span', profileData.company);
      userTextElement('.user-website span', profileData.blog);
      userTextElement('.user-location span', profileData.location);
      userTextElement(
        '.user-member span',
        new Date(profileData.created_at).toLocaleDateString()
      );

      // 저장소 목록 최대 4개
      projectArea.innerHTML = '';

      reposData.slice(0, 4).forEach((repo) => {
        const projectElement = createProjectListElement(repo);
        projectArea.appendChild(projectElement);
      });
    } else {
      handleError();
    }
  } catch (error) {
    handleError();
  }
}

userID.addEventListener('input', (event) => {
  const username = event.target.value.trim();

  if (username === '') {
    copyright.classList.add('active');
    user.classList.remove('active');
  } else {
    copyright.classList.remove('active');
    user.classList.add('active');
    getUserProfileAndRepos(username);
  }
});
