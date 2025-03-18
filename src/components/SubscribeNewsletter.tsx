/**
 * SubscribeNewsletter Component
 *
 * This component renders the newsletter sign-up page.
 * It uses the SubscribeNewsletterForm component to capture user inputs and manages
 * the subscription status. When the subscription is successful, a toast notification is shown,
 * and the user is redirected to the home page.
 */

import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import SubscribeNewsletterForm from "../components/SubscribeNewsletterForm.tsx";

export default function SubscribeNewsletter() {
  // Manage subscription status; possible values: "", "loading", "success", "error", etc.
  const [status, setStatus] = useState("");

  // Message to display when the subscription is successful.
  const message = "Redirecting to 🏠 Page...";

  /**
   * Triggers a toast notification using react-toastify.
   * The toast is displayed at the top-center of the screen with a Bounce transition.
   */
  const notify = () =>
    toast(`🦄 ${message}`, {
      position: "top-center",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  /**
   * Effect hook that listens for changes in the subscription status.
   * When the status becomes "success", the toast notification is triggered,
   * and the user is redirected to the home page after a short delay.
   */
  useEffect(() => {
    if (status === "success") {
      notify();
      setTimeout(() => {
        window.location.href = "/";
      }, 5000); 
    }
  }, [status]);

  return (
    <main>
      {/* Page Header */}
      <h1>Newsletter</h1>
      <h3>Sign-Up</h3>
      {status === "success" && <p>Welcome to the 7th Heaven Newsletter! 🎉</p>}
      {/* Newsletter Subscription Form Component */}
      {/* The "client:load" directive ensures that the component loads on the client side. */}
      <SubscribeNewsletterForm client:load status={status} setStatus={setStatus} />
      {/* ToastContainer renders the toast notifications */}
      <ToastContainer />
    </main>
  );
}
