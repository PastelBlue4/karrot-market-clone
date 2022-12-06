import type { NextPage } from "next";
import Layout from "../../components/layout";
import Message from "../../components/message";

const Stream: NextPage = () => {
  return (
    <Layout canGoBack>
      <div className="px-4 py-10 space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">Galaxy S50</h1>
          <span className="block mt-3 text-2xl text-gray-900">$140</span>
          <p className="my-6 text-gray-700 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            reiciendis nostrum assumenda in obcaecati, provident culpa numquam
            repellat, aperiam neque iure, repellendus perferendis a tenetur
            laborum necessitatibus nemo fugit maiores.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            <Message message="Hi how much are you selling them for?" />
            <Message message="I want ￦20,000" reversed />
            <Message message="미쳤어" />
          </div>
          <div className="fixed inset-x-0 bottom-0 py-2 bg-white">
            <div className="relative flex items-center w-full max-w-md mx-auto">
              <input
                type="text"
                className="w-full pr-12 border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:outline-none focus:border-orange-500"
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex items-center px-3 text-sm text-white bg-orange-500 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
