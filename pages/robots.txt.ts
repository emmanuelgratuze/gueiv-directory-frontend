import { NextApiResponse } from 'next'

function Robots() {}

export const getStaticProps = async (context: { res: NextApiResponse }) => {
  if (process.env.app.appEnv !== 'production') {
    context.res.write('User-agent: *\nDisallow: /');
    return context.res.end();
  }
  return context.res.end();
};

export default Robots;
