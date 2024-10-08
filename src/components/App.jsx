import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addBoard, getBoards } from '../api/borards';


const App = ({ getPosts, posts, setPosts, setSelectedPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async() => {
    if (title && content) {
      //아래 코드의 비효율적인 부분을 지우고 적은 코드 수로 변경
      const idList = posts.map(post => post.id).sort((a, b) => a - b);
      const id =  (idList.find((element)=>element > idList.indexOf(element)+1))-1 || idList.length + 1;
      /*let newId;
      // ID 리스트를 정렬하고, 비어있는 가장 작은 ID 찾기
      const idList = posts.map(post => post.id).sort((a, b) => a - b);
      for (let i = 1; i <= idList.length; i++) {
        if (!idList.includes(i)) {
          newId = i; // 빈 ID를 찾으면 해당 ID를 사용
          break;
        }
      }  
      // 만약 빈 ID가 없으면 가장 큰 값 + 1을 사용
      if (!newId) {
        newId = idList.length + 1;
      }*/
      /*const newPost = {
        id: newId,  // 비어있는 가장 작은 ID 부여
        title,
        content
      };*/
      const data = await addBoard({title,content})
      const newPost = await getBoards();
      setPosts([...newPost]);
      setTitle('');
      setContent('');
    }
  };
  
  useEffect(()=>{
    getPosts()
  },[])
  
  console.log(posts)
  if(!Array.isArray(posts)) return <h1>로딩</h1>
  return (
    <div style={{ padding: '20px', width: '300px', margin: '0 auto' }}>
      <Link to={'/Register'} >
      <button>회원가입</button></Link>
      <h2>게시글 작성</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '100px', marginBottom: '10px', padding: '5px' }}
      />
      <button onClick={handleAddPost} style={{ width: '100%', padding: '10px' }}>
        등록
      </button>

      <h3>게시글 리스트</h3>
      <ul style={{ padding: '0', listStyle: 'none' }}>
        {posts?.map((post) => (
          <li key={post.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
             <Link to={`/Borders/${post.id}`} onClick={() => setSelectedPost(post)} style={{ color: 'black' }}>
              <h4>{post.title}</h4>
             </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
