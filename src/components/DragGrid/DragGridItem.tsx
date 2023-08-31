import React from 'react';

import { PaintCard } from '@components/PaintCard';
import { ThemeType } from '@context/ThemeContext';
import { Card } from '@ui-components/Card';

type TDragGridItemProps = {
  variant: 'author' | 'paint';
  item: any;
  theme: ThemeType;
  index?: number;
  onClickCard: (num: number) => void;
};

const DragGridItem: React.FC<TDragGridItemProps> = ({
  variant,
  item,
  theme,
  index,
  onClickCard,
}) =>
  variant === 'author' ? (
    <Card
      key={item.id}
      {...item}
      id={item.id}
      image={item.paint}
      theme={theme}
      pathTo={`/artists/static/${item.id}`}
    />
  ) : (
    <PaintCard
      key={item.id}
      image={item.paint}
      onClick={onClickCard(index as number)}
      {...item}
      id={item.id}
      theme={theme}
    />
  );

export default DragGridItem;
