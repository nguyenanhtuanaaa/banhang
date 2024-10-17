// chức năng toggle đăng kí đăng nhập
export const handleToggle = (isToggle, setIsToggle) => {
  setIsToggle(!isToggle);
};
// chức năng ẩn element
export const hiddenElement = (element) =>{
  element.style.display = 'none'
}

// hàm chỉnh sửa dữ liệu
export  const putData = ( url ,newData) =>{
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(newData)
    })
}



