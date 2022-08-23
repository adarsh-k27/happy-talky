import { Skeleton, Stack } from '@chakra-ui/react'

import React from 'react'

function SkeletonLoad () {
  return (
    <>
      <Stack>
        <Skeleton height='1.5rem' />
        <Skeleton height='1.5rem' />
        <Skeleton height='1.5rem' />
        <Skeleton height='1.5rem' />
        <Skeleton height='1.5rem' />
        <Skeleton height='1.5rem' />
      </Stack>
    </>
  )
}

export default SkeletonLoad
