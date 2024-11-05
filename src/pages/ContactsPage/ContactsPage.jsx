import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocumentTitle from '../../components/DocumentTitle';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import { selectContacts, selectError, selectLoading } from '../../redux/contacts/selectors';
import css from './ContactsPage.module.css';

function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <main className={css.main}>
      <DocumentTitle>Phonebook</DocumentTitle>

      <section className={css.formSection}>
        <ContactForm />
      </section>

      <section className={css.contactsSection}>
        <SearchBox />

        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && contacts.length > 0 && <ContactList />}
      </section>
    </main>
  );
}

export default ContactsPage;
