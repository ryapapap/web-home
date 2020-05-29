import React, { useState, Suspense } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Chat from '../components/chat';
import Breathe from '../components/custom-chat/breathe';

import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import Wall from '../components/models/wall';
import Doorframe from '../components/models/doorframe';
import Door from '../components/models/door';

const Test = () => {
  return (
    <div />
  );
}

const IndexPage = () => {
  const [showChat, setShowChat] = useState(false);
  
  return (<Layout>
    <SEO title="Web Home" />
    <div style={{ position: 'relative' }}>
    <Canvas
      shadowMap
      style={{ background: 'black', height: '100vh' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
      }}>
      <ambientLight intensity={0.6} />
      <spotLight castShadow intensity={0.3} angle={Math.PI / 10} position={[10, 0, 15]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <spotLight castShadow intensity={0.3} angle={Math.PI / 10} position={[-15, 0, 15]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Suspense fallback={null}>
        <group position={[0, -2.2, 7.5]} rotation={[0,Math.PI,0]}>
          <Wall />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[0, -2.2, 0.5]} rotation={[0,Math.PI,0]}>
          <Doorframe />
        </group>
      </Suspense>
      <Suspense fallback={null}>
        <group position={[0, -2.2, 0.5]} rotation={[0,Math.PI,0]}>
          <Door onClick={() => setShowChat(true)} />
        </group>
      </Suspense>
    </Canvas>
    {showChat &&
      <Chat 
        chats={[
          { type: 'message', msg: `Hey, thanks for coming`, delay: 200 },
          { type: 'message', msg: `normally I'd ask you to take your shoes off...`, delay: 1000},
          { type: 'message', msg: `but since we're online, how about we take a deep breathe together?`, delay: 1000 },
          { 
            type: 'options',
            delay: 600,
            options: [
              { 
                text: 'ok', 
                result: [
                  { type: 'message', msg: `cool!`, delay: 800 },
                  { type: 'interaction', Component: Breathe },
                  { type: 'message', msg: `alright, come on in`, delay: 9000 },
                  { type: 'redirect', msg: 'go inside', url: '/inside', delay: 600 },
                ]
              },
              { 
                text: 'no thx', 
                result: [
                  { type: 'message', msg: `hmm, I don't think I want you to visit then.`, delay: 700 },
                  { 
                    type: 'options',
                    delay: 600,
                    options: [
                      { 
                        text: 'ok, i changed my mind', 
                        result: [
                          { type: 'message', msg: `cool!`, delay: 500 },
                          { type: 'interaction', Component: Breathe },
                          { type: 'message', msg: `alright, come on in`, delay: 9000 },
                          { type: 'redirect', msg: 'go inside', url: '/inside', delay: 600 },
                        ]
                      },
                    ],
                  },
                ]
              },
            ],
          },
          // { type: 'input', response: 'ok, thanks!', },
        ]}
      />}
    </div>
  </Layout>);
}

export default IndexPage
