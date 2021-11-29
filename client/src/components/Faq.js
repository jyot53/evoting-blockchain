import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { scroller } from "react-scroll";
import faq_list from "../Utils/faq.json";
import {useHistory } from "react-router-dom";
import {BsArrowLeft}  from "react-icons/bs"
import './styles/faq.css';
const Faq = () => {
  const alanBtnInstance = useRef(null);
  const [index, setIndex] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const history = useHistory();
  document.title = "VoteChain-FAQ";
  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: "abaf0677c3af5ec12bc8b9538046234f2e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: (commandData) => {
          if (commandData.command === "gotoFaq") {
            scroller.scrollTo(`accordion-button-${commandData.faqId}`, {
              duration: 800,
              delay: 0,
              smooth: "easeInOutQuart",
            });
            // Call the client code that will react to the received command
            setIndex(commandData.faqId - 1);
            setCurrentId(commandData.faqId);
          }
        },
      });
    }
  }, []);
  return (
    <>
    <header className="faq">
      <section className="faq_main">
        <div className="faq_left">
          <figure>
            <img src="https://www.branchbob.com/assets/img/faq.svg" alt="FAQ" />
            {/* <img src={faq_img} alt="FAQ" /> */}
          </figure>
        </div>
        <div className="faq_right">
            <h1>FAQ's</h1>
            <div className="faq_right_back">
              <BsArrowLeft size={40} onClick={() => history.push('/')} />
            </div>
            <hr/>
            <div className="faq_json">
            <ChakraProvider theme={theme}>
            <Accordion allowToggle index={index}>
              {faq_list.map((faq) => (
                <AccordionItem
                  p="4"
                  key={faq.id}
                  name={`accordion-item-${faq.id}`}
                >
                  <AccordionButton
                    onClick={() => {
                      if (faq.id === currentId) {
                        setCurrentId(null);
                        setIndex(null);
                      } else {
                        setCurrentId(faq.id);
                        setIndex(faq.id - 1);
                      }
                    }}
                  >
                    <Box flex="1" textAlign="left">
                      <Text fontWeight="semibold">{faq.question}</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb="4">{faq.answer}</AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </ChakraProvider>
            </div>
        </div>
      </section>
      </header>
    </>
  );
};

export default Faq;

/* 
<ChakraProvider theme={theme}>
        <Accordion allowToggle index={index}>
                {
                    faq_list.map(faq=>(
                        <AccordionItem p="4" key={faq.id} name={`accordion-item-${faq.id}`}>
                            <AccordionButton onClick={() => { 
                                if (faq.id === currentId) {
                                    setCurrentId(null);
                                    setIndex(null);
                                  } else {
                                    setCurrentId(faq.id);
                                    setIndex(faq.id - 1);
                                  }
                            } }>
                                <Box flex="1" textAlign="left">
                                    <Text fontWeight="semibold">{faq.question}</Text>
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            <AccordionPanel pb="4">
                                {faq.answer}
                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
        </Accordion>
    </ChakraProvider>

*/
