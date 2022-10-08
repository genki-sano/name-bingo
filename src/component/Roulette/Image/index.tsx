import Box from '@mui/material/Box'

type Props = {
  alt: string
  src: string
}

export const Image: React.FC<Props> = ({ alt, src }) => {
  return (
    <Box
      component='img'
      sx={{
        width: 500,
        height: 500,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
      alt={alt}
      src={src}
    />
  )
}
