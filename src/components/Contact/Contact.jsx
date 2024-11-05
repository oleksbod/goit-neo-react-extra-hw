import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { BsPersonFill, BsTelephoneFill } from 'react-icons/bs';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { Card, CardContent, IconButton, TextField, Typography } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { useState } from 'react';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import toast from 'react-hot-toast';

function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contactName, setContactName] = useState(name);
  const [contactNumber, setContactNumber] = useState(number);

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        setIsDialogOpen(false);
        toast.success('Contact deleted!');
      })
      .catch((err) => {
        toast.error('Delete contact failed!');
        console.log(err);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      name: contactName,
      number: number
    };

    dispatch(updateContact({ contactId: id, updatedData }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
        toast.success('Contact updated!');
      })
      .catch((err) => {
        toast.error('Update contact failed!');
        console.log(err);
      });
  };

  const handleCancelClick = () => {
    setContactName(name);
    setContactNumber(number);
    setIsEditing(false);
  };

  return (
    <Card className={css.card} aria-hidden={isDialogOpen}>
      <CardContent className={css.cardContent}>
        <div className={css.dataItem}>
          <BsPersonFill className={css.icon} />
          {isEditing ? (
            <TextField
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              variant="outlined"
              size="small"
              className={css.name}
            />
          ) : (
            <Typography variant="h6" className={css.name}>
              {name}
            </Typography>
          )}
        </div>

        <div className={css.dataItem}>
          <BsTelephoneFill className={css.icon} />
          {isEditing ? (
            <TextField
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              variant="outlined"
              size="small"
              className={css.number}
            />
          ) : (
            <Typography variant="body1" className={css.number}>
              {number}
            </Typography>
          )}
        </div>

        <div className={css.actions}>
          {isEditing ? (
            <>
              <IconButton color="primary" onClick={handleSaveClick}>
                <Save />
              </IconButton>
              <IconButton color="secondary" onClick={handleCancelClick}>
                <Cancel />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="primary" onClick={handleEditClick}>
                <Edit />
              </IconButton>
              <IconButton color="secondary" onClick={handleDeleteClick}>
                <Delete />
              </IconButton>
            </>
          )}
        </div>
      </CardContent>

      <ConfirmationDialog
        open={isDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this contact?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDialog}
      />
    </Card>
  );
}

export default Contact;
