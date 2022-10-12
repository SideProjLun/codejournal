import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'

import './PostForm.css'

const PostForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.post?.id)
  }

  const { currentUser } = useAuth()

  const languages = [
    'HTML',
    'CSS',
    'Javascript',
    'TypeScript',
    'Ruby',
    'Java',
    'Python',
    'C++',
    'C#',
    'R',
    'Golang',
    'Swift',
    'Rust',
    'Scheme',
    'Kotlin',
    'Perl',
    'PHP',
    'Scala',
  ]

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="title-rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.post?.title}
          className="title-rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="codeLanguage"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Code language
        </Label>

        <SelectField
          name="codeLanguage"
          className="language-rw-input"
          defaultValue={props.post?.codeLanguage}
          validation={{
            required: true,
          }}
        >
          {languages &&
            languages.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
        </SelectField>
        <FieldError name="selectSingle" style={{ color: 'red' }} />

        <FieldError name="codeLanguage" className="rw-field-error" />

        <Label
          name="Insert Code Here"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Code snippet
        </Label>

        <TextAreaField
          name="codeSnippet"
          defaultValue={props.post?.codeSnippet}
          className="snippet-rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          spellcheck="false"
        />

        <FieldError name="codeSnippet" className="rw-field-error" />

        <Label
          name="Insert Code Explained Here"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Explanation
        </Label>

        <TextAreaField
          name="explanation"
          defaultValue={props.post?.explanation}
          className="explanation-rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="explanation" className="rw-field-error" />

        <FieldError name="title" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
