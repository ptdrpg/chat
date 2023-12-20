import '../App.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { connexState } from '../state/store';

type Props = {
  socket: any
}

function Home({ socket }: Props) {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [props, setProps] = useRecoilState(connexState);
  const join = () => {
    if (name !== '' && room !== '') {
      socket.connect();
      socket.emit("join_room", room);
      setProps({
        username: name,
        room: room
      })
      navigate('/chat')
      }
  }
  return (
    <>
      <input type="text" placeholder='name' name='username' onChange= {(e)=>{setName(e.target.value)}} />
      <input type="text" placeholder='room' name='room' onChange={(e)=>{setRoom(e.target.value)}} /> 
      <button onClick={join} >connecter</button>
    </>
  )
}

export default Home