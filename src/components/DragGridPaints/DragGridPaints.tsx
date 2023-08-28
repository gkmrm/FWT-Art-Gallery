import React from 'react';

import { DragCard } from '@components/DragCard';
import { PaintCard } from '@components/PaintCard';
import { ThemeType } from '@context/ThemeContext';
import { IArtistsByIdModel } from '@store/models/ArtistByIdModel';
import checkMainPainting from '@utils/functions/checkMainPainting';

type TDragGridPaintsProps = {
  paints: IArtistsByIdModel[];
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
          title={item.name}
          subtitle={item.years}
          isMainPainting={checkMainPainting(item.id, mainPainting)}
          authorId={authorId}
          key={item.id}
          // image={item.mainPaint?.paint}
          // onClick={onClickCard(index)}
          paintId={item.id}
          {...item}
          theme={theme}
        />
      </DragCard>
    ))}
  </>
);

export default DragGridPaints;
