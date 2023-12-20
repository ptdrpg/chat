import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { connexState } from '../state/store';
import '../assets/chat.css'
import { useState, useEffect } from 'react';

type Props = {
    socket: any
}

type message = {
  room: string,
  author: string,
  message: string,
  time: string
}

function Chat({ socket }: Props) {
    const navigate = useNavigate();
    const [porps, setProps] = useRecoilState(connexState);
    const deco = () => {
        socket.disconnect();
      navigate('/');
      setProps({ username: '', room: '' });
    }
  const [rec, setRec] = useState('');
  const [mess, setMess] = useState<message[]>([]);
  const send = () => {
    if (rec !== '') {
      const messageData = {
        room: porps.room,
        author: porps.username,
        message: rec,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      };
      socket.emit("send_message", messageData);
      setMess((item) => [...item, messageData]);
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data:message) => {
      setMess((item)=>[...item, data]);
    })
  },[])
  return (
      <>
      <button onClick={deco} >deconnecter</button>
      <section className='chating' >
        <div className='chat'>
        <div className='chat_header' >
          <p>chat Live</p>
        </div>
        <div className='chat_body' >
          {
            mess.map((item, index) => <div id={porps.username === item.author? "yours" : "there"}>
              <div className='message_content' id={porps.username === item.author? "you" : "other"} >
                <p>{item.message}</p>
              </div>
              <div className='data_time'>
                <p>{item.author}</p>
                <p>{item.time}</p>
              </div>
            </div>)
          }
        </div>
        <div className='chat_foot' >
          <input type="text" className='mess_input' />
          <button className='send' onClick={send} >send</button>
        </div>
      </div>
      </section>
      </>
  )
}

export default Chat