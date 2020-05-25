import React, { Suspense } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Chat from '../components/chat';

import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'

import Model from '../components/models/door';

const Test = () => {
  return (
    <div />
  );
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div style={{ position: 'relative' }}>
    <Canvas
      shadowMap
      style={{ background: 'orange', height: '100vh' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.Uncharted2ToneMapping
        gl.outputEncoding = THREE.sRGBEncoding
      }}>
      <ambientLight intensity={0.6} />
      <spotLight castShadow intensity={0.6} angle={Math.PI / 10} position={[10, 10, 10]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <Suspense fallback={null}>
        <group position={[0, -1.5, 0]} rotation={[0,Math.PI,0]}>
          <Model />
        </group>
      </Suspense>
    </Canvas>
    <Chat 
      chats={[
        { type: 'message', msg: `Hey, thanks for coming` },
        { type: 'message', msg: `normally I'd ask you to take your shoes off...`, delay: 600},
        { type: 'message', msg: `but since we're online, how about we take a deep breathe together?`, delay: 600 },
        { 
          type: 'options',
          delay: 300,
          options: [
            { 
              text: 'ok', 
              result: [
                { type: 'message', msg: `breathe in... breathe out..` },
                { type: 'input', response: 'ok, thanks!', },
              ]
            },
            { 
              text: 'no thx', 
              result: [
                { type: 'message', msg: `hmm, I don't think I want you to visit then.` },
              ]
            },
          ],
        },
        { type: 'input', response: 'ok, thanks!', },
      ]}
    />
    </div>
  </Layout>
)

export default IndexPage
