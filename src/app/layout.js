
"use client"
import './globals.css';
import { Provider } from "react-redux";
import store from '../redux/store';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../style/table.css';
import '../style/form.css';
import Loader from '../helper/loader/loader';

export default function RootLayout({ children }) {
  // document.querySelectorAll('[data-new-gr-c-s-check-loaded], [data-gr-ext-installed]').forEach(element => {
  //   element.removeAttribute('data-new-gr-c-s-check-loaded');
  //   element.removeAttribute('data-gr-ext-installed');
  // });
  return (
    <html lang="en">
      <body className='main_body'>
        <Provider store={store}>
          <ToastContainer />
          <Loader />
          {children}
        </Provider>
      </body>
    </html>
  )
}
