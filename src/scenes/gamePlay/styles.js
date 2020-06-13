import styled, {css} from 'styled-components';

export const Body = styled.View``;

export const Container = styled.View``;

export const Grid = styled.View`
  width: 200px;
  height: 400px;
  background-color: yellow;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Square = styled.View`
  height: 20px;
  width: 20px;
  ${(props) =>
    props.tetromino
      ? css`
          background: blue;
        `
      : css`
          background: yellow;
        `}
  ${(props) =>
    props.taken &&
    css`
      background: purple;
    `}
`;
