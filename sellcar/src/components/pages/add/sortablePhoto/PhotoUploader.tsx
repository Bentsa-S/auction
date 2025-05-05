import React from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import SortablePhoto from './SortablePhoto';

interface PhotoUploaderProps {
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  activePhoto: File | null;
  setActivePhoto: React.Dispatch<React.SetStateAction<File | null>>;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  photos,
  setPhotos,
  activePhoto,
  setActivePhoto,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos([...photos, ...Array.from(e.target.files)]);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const index = Number(event.active.id);
    setActivePhoto(photos[index]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePhoto(null);

    if (active.id !== over?.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over?.id);
      setPhotos((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="photosWrapper">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={photos.map((_, i) => i.toString())}
          strategy={horizontalListSortingStrategy}
        >
          <div className="photosContainer" style={{ display: 'flex', gap: '10px' }}>
            {photos.map((file, index) => (
              <SortablePhoto key={index} file={file} index={index} id={index.toString()} />
            ))}
            <label className="addPhoto">
              +
              <input type="file" multiple hidden onChange={handleAddPhoto} />
            </label>
          </div>
        </SortableContext>

        <DragOverlay>
          {activePhoto ? (
            <img
              src={URL.createObjectURL(activePhoto)}
              alt="drag preview"
              className="photo"
              style={{ opacity: 0.7 }}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default PhotoUploader;
