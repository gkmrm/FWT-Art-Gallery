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
import { IArtistsModel } from '@models/ArtistsModel';
import { IPaintModel } from '@models/PaintModel';
import { Card } from '@ui-components/Card';
import { Grid } from '@ui-components/Grid';
import checkMainPainting from '@utils/functions/checkMainPainting';

type TDragGridProps = {
  array: IArtistsModel[] | IPaintModel[];
  mainPainting?: string;
  authorId?: string;
  theme: ThemeType;
  onClickCard?: (index: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const DragGrid: React.FC<TDragGridProps> = ({
  mainPainting = '',
  array,
  theme,
  onClickCard = () => {},
  authorId = '',
}) => {
  const [items, setItems] = useState(array);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  useEffect(() => setItems(array), [array]);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => setActiveId(event.active.id),

    []
  );

  const checkType = (
    arr: IArtistsModel[] | IPaintModel[]
  ): arr is IArtistsModel[] => 'genres' in arr[0];

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setItems((items) => {
        const oldIndex = items.map((i) => i.id).indexOf(active.id as string);
        const newIndex = items.map((i) => i.id).indexOf(over?.id as string);

        if (checkType(items)) {
          return arrayMove(items, oldIndex, newIndex);
        }

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    return setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const cardArtist = (item: IArtistsModel) => (
    <DragCard id={item.id} key={item.id} theme={theme}>
      <Card
        key={item.id}
        {...item}
        id={item.id}
        image={item.paint || null}
        theme={theme}
        pathTo={`/artists/${item.id}`}
      />
    </DragCard>
  );

  const paintCard = (item: IPaintModel, index: number) => (
    <DragCard id={item.id} key={item.id} theme={theme}>
      <PaintCard
        image={item.paint || null}
        {...item}
        isMainPainting={checkMainPainting(item.id, mainPainting)}
        authorId={authorId}
        key={item.id}
        paintId={item.id}
        theme={theme}
        onClick={() => onClickCard(index)}
      />
    </DragCard>
  );

  const getGrid = (arr: IArtistsModel[] | IPaintModel[]) => {
    if (checkType(arr)) {
      return arr.map((item) => cardArtist(item));
    }

    return arr.map((item, index) => paintCard(item, index));
  };

  const overlayCard = (arr: IArtistsModel[] | IPaintModel[]) => {
    if (checkType(arr)) {
      return arr.map((item) => item.id === activeId && cardArtist(item));
    }

    return arr.map(
      (item, index) => item.id === activeId && paintCard(item, index)
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid>{getGrid(items)}</Grid>
      </SortableContext>
      <DragOverlay adjustScale>
        {activeId ? overlayCard(items) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DragGrid;
