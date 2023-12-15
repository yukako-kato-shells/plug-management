interface IconWrapperProps {
  icon_url: string;
  size: number;
}

const IconWrapper: React.FC<IconWrapperProps> = (props) => {
  return (
    <>
    { props.icon_url == "" ?
      <div style={{
        height: `${props.size}px`,
        width: `${props.size}px`,
        borderRadius: `${props.size / 2}px`,
        border: '1px solid var(--based-border-color)',
        backgroundColor: 'rgb(247, 247, 247)',
      }}></div>
      :
      <img
        src={props.icon_url}
        style={{
          height: `${props.size}px`,
          width: `${props.size}px`,
          borderRadius: `${props.size / 2}px`,
          border: '1px solid var(--based-border-color)',
          objectFit: 'cover',
          objectPosition: 'center',
          backgroundColor: 'white',
        }} />
      }
    </>
  )
}

export default IconWrapper;