import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Chat from '../components/chat';

const Test = () => {
  return (
    <div />
  );
}

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link to="/page-2/">Go to page 2</Link>
    <Test />
    <Chat 
      chats={[
        { type: 'message', msg: `Hey, thanks for coming` },
        { type: 'message', msg: `normally I'd ask you to take your shoes off...`},
        { type: 'message', msg: `but since we're online, how about we take a deep breathe together?`, delay: 300 },
        { 
          type: 'options', 
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
        // { type: 'input', response: 'ok, thanks!', },
      ]}
    />
  </Layout>
)

export default IndexPage
