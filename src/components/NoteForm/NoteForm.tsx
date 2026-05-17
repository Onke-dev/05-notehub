import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";

interface NoteListValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NoteListValues = {
  title: "",
  content: "",
  tag: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title is too short")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .min(2, "Content is too short")
    .max(500, "Content is too long")
    .required("Content is required"),
  tag: Yup.string().required("Select tag"),
});

function NoteForm({ onClose }: NoteFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" type="text" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
