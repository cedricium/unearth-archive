import React from 'react'
import { Location } from '@reach/router'

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
  const { pathname } = props.location
  const path = pathname.split('/')[3]

  console.log(path)

  const neighborPaths = getNeighborPaths(path)

  return (
    <div>
      <button
        disabled={!neighborPaths.prev}
        onClick={() =>
          props.navigate(`/app/onboarding/${neighborPaths['prev']}`)
        }
      >
        Previous
      </button>
      <button
        disabled={!neighborPaths.next}
        onClick={() =>
          props.navigate(`/app/onboarding/${neighborPaths['next']}`)
        }
      >
        Next
      </button>
    </div>
  )
}

const withLocation = ComposedComponent => {
  const LocationInjected = () => (
    <Location>
      {({ location, navigate }) => (
        <ComposedComponent navigate={navigate} location={location} />
      )}
    </Location>
  )

  return LocationInjected
}

export default withLocation(Navigation)
