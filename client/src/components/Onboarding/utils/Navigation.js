import React from 'react'
import { withRouter } from 'react-router-dom'

const getNeighborPaths = currentPath => {
  const pathMap = {
    email: {
      prev: null,
      next: 'frequency',
    },
    frequency: {
      prev: 'email',
      next: 'sync',
    },
    sync: {
      prev: 'frequency',
      next: null,
    },
  }
  return pathMap[currentPath]
}

const Navigation = props => {
  const fullPath = props.match.path
  const path = fullPath.split('/')[2]
  const neighborPaths = getNeighborPaths(path)

  return (
    <div>
      <button
        disabled={!neighborPaths.prev}
        onClick={() =>
          props.history.push(`/onboarding/${neighborPaths['prev']}`)
        }
      >
        Previous
      </button>
      <button
        disabled={!neighborPaths.next}
        onClick={() =>
          props.history.push(`/onboarding/${neighborPaths['next']}`)
        }
      >
        Next
      </button>
    </div>
  )
}

export default withRouter(Navigation)
