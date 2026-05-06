import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import EstimateCalculator from "./components/EstimateCalculator";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [auditSent, setAuditSent] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Testimonials />
        
        <AnimatePresence>
          {!auditSent && (
            <motion.div
              key="calculator"
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <EstimateCalculator />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Contact onAuditSuccess={() => setAuditSent(true)} />
      </main>
      <Footer />
    </>
  );
}
