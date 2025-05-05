import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const SortablePhoto = ({ file, index, id }: { file: File; index: number; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transform ? 'transform 200ms ease' : undefined,
    marginRight: '10px',
  };

  return (
    <img
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      src={URL.createObjectURL(file)}
      alt="photo"
      className="photo"
      style={style}
    />
  );
};


export default SortablePhoto