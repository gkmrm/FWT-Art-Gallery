import React from 'react';

import { DragCard } from '@components/DragCard';
import { PaintCard } from '@components/PaintCard';
import { ThemeType } from '@context/ThemeContext';
// import { IArtistsByIdModel } from '@store/models/ArtistByIdModel';
import { IPaintModel } from '@store/models/PaintModel';
import checkMainPainting from '@utils/functions/checkMainPainting';

type TDragGridPaintsProps = {
  paints: IPaintModel[];
  authorId: string;
  mainPainting: string;
  theme: ThemeType;
};

const DragGridPaints: React.FC<TDragGridPaintsProps> = ({
  paints,
  authorId,
  theme,
  mainPainting,
}) => (
  <>
    {paints.map((item) => (
      <DragCard id={item.id} key={item.id} theme={theme}>
        <PaintCard
          image={item.paint}
          {...item}
          isMainPainting={checkMainPainting(item.id, mainPainting)}
          authorId={authorId}
          key={item.id}
          // onClick={onClickCard(index)}
          paintId={item.id}
          theme={theme}
        />
      </DragCard>
    ))}
  </>
);

export default DragGridPaints;
