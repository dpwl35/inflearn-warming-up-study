import React, { useRef } from 'react';
import styled from 'styled-components';

export default function Genre() {
  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].play(); // 해당 인덱스의 비디오 재생
    }
  };

  const handleMouseLeave = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause(); // 해당 인덱스의 비디오 일시 정지
    }
  };

  const items = [
    {
      videoSrc:
        'https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4',
      imgSrc:
        'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FFA0BEBAC1406D88929497501C84019EBBA1B018D3F7C4C3C829F1810A24AD6E/compose?format=webp&width=800',
    },
    {
      videoSrc:
        'https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217992-pixar.mp4',
      imgSrc:
        'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/7F4E1A299763030A0A8527227AD2812C049CE3E02822F7EDEFCFA1CFB703DDA5/compose?format=webp&width=800',
    },
    {
      videoSrc:
        'https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217799-marvel.mp4',
      imgSrc:
        'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/C90088DCAB7EA558159C0A79E4839D46B5302B5521BAB1F76D2E807D9E2C6D9A/compose?format=webp&width=800',
    },
    {
      videoSrc:
        'https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2020/12/17/1608229334-star-wars.mp4',
      imgSrc:
        'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/5A9416D67DC9595496B2666087596EE64DE379272051BB854157C0D938BE2C26/compose?format=webp&width=800',
    },
    {
      videoSrc:
        'https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217923-national-geographic.mp4',
      imgSrc:
        'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/2EF24AA0A1E648E6D1A3B26491F516632137ED87AB22969D153316F8BD670FB5/compose?format=webp&width=800',
    },
    {
      videoSrc:
        'https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2020/12/17/1608170098-brand-star.mp4',
      imgSrc:
        'https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/AE893BCDD6264C4A876C03A0DE5004D9F394BE1E8388F085431318CDCEC9A598/compose?format=webp&width=800',
    },
  ];

  return (
    <GenreContainer>
      {items.map((item, index) => (
        <GenreContainerBox
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          <div>
            <GenreContainerVideo
              ref={(el) => (videoRefs.current[index] = el)}
              playsInline
              loop
              muted
              data-testid='brand-set-video'
            >
              <source
                src={item.videoSrc}
                type='video/mp4'
                data-testid='brand-set-video-source'
              />
            </GenreContainerVideo>
            <GenreContainerBoxImg src={item.imgSrc} alt='d' />
          </div>
        </GenreContainerBox>
      ))}
    </GenreContainer>
  );
}

const GenreContainer = styled.div`
  width: calc(100% - (71px * 2));
  display: flex;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const GenreContainerBox = styled.div`
  position: relative;
  padding: 10px 10px 12px 10px;
  width: calc(100% / 6);
  transition: all 0.3s ease;
  cursor: pointer;

  div {
    position: relative;
    background: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));
    box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px,
      rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;
    border-radius: 6px;
    overflow: hidden;
  }

  &:hover {
    transform: scale(1.05);
    transition-property: transform;
    div {
      outline: 3px solid #ffffff;
      outline-offset: 3px;
    }
    video {
      opacity: 1;
    }
  }
`;

const GenreContainerVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
`;

const GenreContainerBoxImg = styled.img`
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
`;
