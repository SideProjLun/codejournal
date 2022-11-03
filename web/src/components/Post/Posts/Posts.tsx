import humanize from 'humanize-string'
import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { QUERY } from 'src/components/Post/PostsCell'
import './Posts.css'
import Trash from './../../Assets/trash-can.png'
import Edit from './../../Assets/edit.png'
import View from './../../Assets/journal.png'
import { useAuth } from '@redwoodjs/auth'
import { Form, InputField, TextField, SelectField } from '@redwoodjs/forms'
import { languages } from '../PostForm'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > 30) {
    output = output.substring(0, 30) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTruncate = (text) => {
  let output = text
  if (text && text.length > 3) {
    output = output.substring(0, 3) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const PostsList = ({ posts }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Entry deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  const { currentUser } = useAuth()

  const currentUserPosts = []
  posts &&
    posts.map((item) => {
      if (item.authorId === currentUser.id) {
        currentUserPosts.push(item)
      }
    })

  const reversePosts = (arr) => {
    let newArr = []
    newArr.push(...arr)
    return newArr.reverse()
  }

  const currentUserPostsReversed = reversePosts(currentUserPosts)

  //LANGUAGE FILTER
  const [chosenLanguage, setLanguage] = useState()

  let onChange = (event) => {
    const newValue = event.target.value
    setLanguage(newValue)
    console.log(newValue)
  }

  const languageSpecific = []

  currentUserPostsReversed.map((item) => {
    if (chosenLanguage === 'All Posts') {
      return languageSpecific.push(item)
    } else if (item.codeLanguage === chosenLanguage) {
      languageSpecific.push(item)
    } else if (item.title === chosenLanguage) {
      languageSpecific.push(item)
    }
  })


  return (
    <>
      <div>
        <Form>
          {/* drop down for filtering languages */}
          <SelectField
            name="codeLanguage"
            className="language-input"
            onChange={onChange}
            validation={{
              required: true,
            }}
          >
            <option>All Posts</option>
            {languages &&
              languages.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
          </SelectField>
        </Form>
      </div>
      <div>
        {/* input for filtering keywords */}

        <input className="language-input" onChange={onChange}></input>
      </div>
      <div className="postsContainer">
        <tbody>
          {languageSpecific.map((post) => (
            <tr key={post.id}>
              <td>{timeTag(post.createdAt)}</td>
              <td>{truncate(post.title)}</td>
              <td>{truncate(post.codeLanguage)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.post({ id: post.id })}
                    title={'Show post '}
                    className="iconPosts"
                  >
                    <img src={View} />{' '}
                  </Link>
                  <Link
                    to={routes.editPost({ id: post.id })}
                    title={'Edit Post'}
                    className="iconPosts"
                  >
                    <img src={Edit} />{' '}
                  </Link>
                  <button
                    type="button"
                    title={'Delete Post'}
                    onClick={() => onDeleteClick(post.id)}
                    className="iconPosts"
                  >
                    {' '}
                    <img src={Trash} />{' '}
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>

        {/* <table>
        <thead className="cardTitle">Entries</thead>
        <tbody>
          <th>Date</th>
          <th>Title</th>
          <th>Lang</th>
          <th>&nbsp;</th>
        </tbody>
        <tbody>
          {currentUserPostsReversed.map((post) => (
            <tr key={post.id}>
              <td>{timeTag(post.createdAt)}</td>
              <td>{truncate(post.title)}</td>
              <td>{truncate(post.codeLanguage)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.post({ id: post.id })}
                    title={'Show post '}
                    className="iconPosts"
                  >
                    <img src={View} />{' '}
                  </Link>
                  <Link
                    to={routes.editPost({ id: post.id })}
                    title={'Edit Post'}
                    className="iconPosts"
                  >
                    <img src={Edit} />{' '}
                  </Link>
                  <button
                    type="button"
                    title={'Delete Post'}
                    onClick={() => onDeleteClick(post.id)}
                    className="iconPosts"
                  >
                    {' '}
                    <img src={Trash} />{' '}
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div>
    </>
  )
}

export default PostsList
