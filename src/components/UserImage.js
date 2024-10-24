//유저 이미지는 컨텍스트로 관리

const UserImage = ({ userImg }) => {
  const url = "";

  // 하나는 그냥 보여주는 div

  // 다른 하나는 이미지 업데이트할때 관리하는 div
  return <div>{userImg == null ? <div></div> : <div></div>}</div>;
};
export default UserImage;
