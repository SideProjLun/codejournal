// import React from 'react'
// import { Link, routes } from '@redwoodjs/router'
// import Edit from './../../Assets/edit.png'
// import View from './../../Assets/journal.png'
// import DeletePost from './DeletePost'
// import './Posts.css'

// function PostMapper({ filteredPosts }) {
//   const truncate = (text) => {
//     let output = text
//     if (text && text.length > 30) {
//       output = output.substring(0, 30) + '...'
//     }
//     return output
//   }

//   const timeTag = (datetime) => {
//     return (
//       datetime && (
//         <time dateTime={datetime} title={datetime}>
//           {new Date(datetime).toLocaleString()}
//         </time>
//       )
//     )
//   }

//   return (
//     filteredPosts.length > 0 && (
//       <div className="postsContainer">
//         <tbody>
//           {filteredPosts.map((post) => (
//             <tr key={post.id}>
//               <td>{timeTag(post.createdAt)}</td>
//               <td>{truncate(post.title)}</td>
//               <td>
//                 <strong>{truncate(post.codeLanguage)}</strong>
//               </td>
//               <td>
//                 <nav className="rw-table-actions">
//                   <Link
//                     to={routes.post({ id: post.id })}
//                     title={'Show post '}
//                     className="iconPosts"
//                   >
//                     <img src={View} />{' '}
//                   </Link>
//                   <Link
//                     to={routes.editPost({ id: post.id })}
//                     title={'Edit Post'}
//                     className="iconPosts"
//                   >
//                     <img src={Edit} />{' '}
//                   </Link>
//                   <DeletePost post={post} />
//                 </nav>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </div>
//     )
//   )
// }

// export default PostMapper