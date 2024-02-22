import React from 'react'

export default function Alert(props) {
  return (
    <div>
        <div style={{position:"fixed"}} class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>{props.status}</strong> {props.message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    </div>
  )
}
