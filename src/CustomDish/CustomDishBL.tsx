import { useState, type FC, type ReactElement } from 'react';
import type { CustomDish } from '../data/types';
import { CustomDishesStore } from '../states';

interface Props {
  renderCard: (props: { onClick: () => void }) => ReactElement;
  renderModal: (props: {
    onClose: () => void;
    onSubmit: (data: Omit<CustomDish, 'id'>) => void;
    onDelete?: () => void;
    defaultData?: Omit<CustomDish, 'id'>;
  }) => ReactElement;
}

const CustomDishBL: FC<Props> = ({ renderCard, renderModal }) => {
  const addDish = CustomDishesStore.useDispatcher('add');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const onSubmit = (data: Omit<CustomDish, 'id'>) => {
    addDish(data);
    onClose();
  };

  return (
    <>
      {renderCard({ onClick: openModal })}
      {isModalOpen && renderModal({ onClose, onSubmit })}
    </>
  );
};

export const CustomDishEditModalBl: FC<{
  renderModal: Props['renderModal'];
  onClose: () => void;
  dish: CustomDish;
}> = ({ dish, renderModal, onClose }) => {
  const editDish = CustomDishesStore.useDispatcher('edit');
  const deleteDish = CustomDishesStore.useDispatcher('delete');

  const onSubmit = (data: Omit<CustomDish, 'id'>) => {
    editDish({ ...data, id: dish.id });
    onClose();
  };

  return <>{renderModal({ onClose, onSubmit, onDelete: () => deleteDish(dish.id), defaultData: dish })}</>;
};

export default CustomDishBL;
