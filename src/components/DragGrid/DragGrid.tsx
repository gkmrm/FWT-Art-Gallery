import React, { useState, useCallback, useEffect } from 'react';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import { DragCard } from '@components/DragCard';
import { PaintCard } from '@components/PaintCard';
import { ThemeType } from '@context/ThemeContext';
// import { IArtistsByIdModel } from '@store/models/ArtistByIdModel';
// import { IArtistsModel } from '@store/models/ArtistsModel';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
import checkMainPainting from '@utils/functions/checkMainPainting';

type TDragGridProps = {
  // array: IArtistsModel[] | IArtistsByIdModel[];
  array: any[];
  mainPainting?: string;
  authorId: string;
  theme: ThemeType;
  variant: 'author' | 'paint';
  onClickCard?: (index: number) => () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const DragGrid: React.FC<TDragGridProps> = ({
  mainPainting = '',
  array,
  theme,
  variant,
  authorId,
  onClickCard = () => {},
}) => {
  // const checkType = (
  //   arr: IArtistsModel[] | IArtistsByIdModel[]
  // ): arr is IArtistsModel[] => !('paintings' in arr[0]);
  const [items, setItems] = useState(array);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  // const getTypedArr = (arr: IArtistsModel[] | IArtistsByIdModel[]) =>
  //   checkType(arr) ? arr : arr;

  useEffect(() => setItems(array), [array]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setItems((items) => {
        const oldIndex = items.map((i) => i.id).indexOf(active.id as string);
        const newIndex = items.map((i) => i.id).indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const grid =
    variant === 'author'
      ? items.map((item) => (
          <DragCard id={item.id} key={item.id} theme={theme}>
            <Card
              key={item.id}
              {...item}
              id={item.id}
              image={item.paint}
              theme={theme}
              pathTo={`/artists/${item.id}`}
            />
          </DragCard>
        ))
      : items.map((item, index) => (
          <DragCard id={item.id} key={item.id} theme={theme}>
            <PaintCard
              isMainPainting={checkMainPainting(item.id, mainPainting)}
              authorId={authorId}
              key={item.id}
              image={item.paint}
              onClick={onClickCard(index)}
              paintId={item.id}
              {...item}
              theme={theme}
            />
          </DragCard>
        ));

  const overlayCard = (
    <DragCard id={activeId as string} theme={theme}>
      {items.map((item, index) =>
        // eslint-disable-next-line no-nested-ternary
        item.id === activeId ? (
          variant === 'author' ? (
            <Card
              key={item.id}
              {...item}
              id={item.id}
              image={item.paint}
              theme={theme}
              pathTo={`/artists/${item.id}`}
            />
          ) : (
            <PaintCard
              authorId={item.id}
              key={item.id}
              image={item.paint}
              onClick={onClickCard(index)}
              {...item}
              theme={theme}
            />
          )
        ) : null
      )}
    </DragCard>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid>{grid}</Grid>
      </SortableContext>
      <DragOverlay adjustScale>{activeId ? overlayCard : null}</DragOverlay>
    </DndContext>
  );
};

export default DragGrid;
