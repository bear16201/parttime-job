const MasterLayout = ({ children, ...props }) => {
    return (
      <div {...props}>
        {children}
      </div>
    )
  }
  
  export default MasterLayout;