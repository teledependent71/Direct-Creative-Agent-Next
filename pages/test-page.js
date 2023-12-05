import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Direct Creative Agent</title>
          <meta
            property="og:title"
            content="test-page - Direct Creative Agent"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_4edcn) => (
            <>
              <h1>{context_4edcn?.Name}</h1>
            </>
          )}
          initialData={props.context4edcnProp}
          persistDataDuringLoading={true}
          key={props?.context4edcnProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const context4edcnProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        context4edcnProp: context4edcnProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
