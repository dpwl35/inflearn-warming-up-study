import React from 'react';
import styled from 'styled-components';

export default function Genre() {
  return (
    <GenreContainer>
      <GenreContainerBox>
        <div>
          <GenreContainerVideo
            autoplay=''
            playsinline=''
            loop=''
            data-testid='brand-set-video'
          >
            <source
              src='https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4'
              type='video/mp4'
              data-testid='brand-set-video-source'
            />
          </GenreContainerVideo>
          <GenreContainerBoxImg
            src='https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/FFA0BEBAC1406D88929497501C84019EBBA1B018D3F7C4C3C829F1810A24AD6E/compose?format=webp&width=800'
            alt='d'
          />
        </div>
      </GenreContainerBox>
      <GenreContainerBox>
        <div>
          <GenreContainerVideo
            autoplay=''
            playsinline=''
            loop=''
            data-testid='brand-set-video'
          >
            <source
              src='https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4'
              type='video/mp4'
              data-testid='brand-set-video-source'
            />
          </GenreContainerVideo>
          <GenreContainerBoxImg
            src='https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/7F4E1A299763030A0A8527227AD2812C049CE3E02822F7EDEFCFA1CFB703DDA5/compose?format=webp&amp;width=800'
            alt='d'
          />
        </div>
      </GenreContainerBox>
      <GenreContainerBox>
        <div>
          <GenreContainerVideo
            autoplay=''
            playsinline=''
            loop=''
            data-testid='brand-set-video'
          >
            <source
              src='https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4'
              type='video/mp4'
              data-testid='brand-set-video-source'
            />
          </GenreContainerVideo>
          <GenreContainerBoxImg
            src='https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/C90088DCAB7EA558159C0A79E4839D46B5302B5521BAB1F76D2E807D9E2C6D9A/compose?format=webp&width=800'
            alt='d'
          />
        </div>
      </GenreContainerBox>
      <GenreContainerBox>
        <div>
          <GenreContainerVideo
            autoplay=''
            playsinline=''
            loop=''
            data-testid='brand-set-video'
          >
            <source
              src='https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4'
              type='video/mp4'
              data-testid='brand-set-video-source'
            />
          </GenreContainerVideo>
          <GenreContainerBoxImg
            src='https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/5A9416D67DC9595496B2666087596EE64DE379272051BB854157C0D938BE2C26/compose?format=webp&width=800'
            alt='d'
          />
        </div>
      </GenreContainerBox>
      <GenreContainerBox>
        <div>
          <GenreContainerVideo
            autoplay=''
            playsinline=''
            loop=''
            data-testid='brand-set-video'
          >
            <source
              src='https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4'
              type='video/mp4'
              data-testid='brand-set-video-source'
            />
          </GenreContainerVideo>
          <GenreContainerBoxImg
            src='https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/2EF24AA0A1E648E6D1A3B26491F516632137ED87AB22969D153316F8BD670FB5/compose?format=webp&width=800'
            alt='d'
          />
        </div>
      </GenreContainerBox>
      <GenreContainerBox>
        <div>
          <GenreContainerVideo
            autoplay=''
            playsinline=''
            loop=''
            data-testid='brand-set-video'
          >
            <source
              src='https://vod-bgc-oc-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/07/1565217865-disney.mp4'
              type='video/mp4'
              data-testid='brand-set-video-source'
            />
          </GenreContainerVideo>
          <GenreContainerBoxImg
            src='https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/AE893BCDD6264C4A876C03A0DE5004D9F394BE1E8388F085431318CDCEC9A598/compose?format=webp&width=800'
            alt='d'
          />
        </div>
      </GenreContainerBox>
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

  div {
    position: relative;
    background: linear-gradient(rgb(48, 50, 62), rgb(30, 31, 42));
    border-radius: 6px;
    overflow: hidden; /* 자식 요소가 부모의 border-radius에 맞게 잘리도록 설정 */
  }

  &:hover {
    transform: scale(1.05); /* 요소를 확대 */
    transition-property: transform;
    div {
      outline: 3px solid #ffffff;
      outline-offset: 3px;
    }
  }
`;

const GenreContainerVideo = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const GenreContainerBoxImg = styled.img`
  width: 100%;
  display: block; /* img 요소를 블록으로 설정하여 부모의 넓이를 채우도록 함 */
  position: relative;
  z-index: 10;
`;
