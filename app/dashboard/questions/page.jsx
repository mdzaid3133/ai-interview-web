'use client';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { chatSession } from '@/utils/GeminiAiModel';
import { ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react'; // Make sure to import the LoaderCircle component

function Page() {
  const [jobPosition, setJobPosition] = useState('');
  const [jsonResponses, setJSONResponses] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [questionQuentity, setQuestionQuentity] = useState(10);

  const questionsPrompt = `Generate ${questionQuentity} interview questions and their detailed answers for a ${jobPosition} position. Provide the output in JSON format as follows:

[
  {
    "question": "Your question here",
    "answer": "The corresponding detailed answer here"
  },
  ...
]`;

  useEffect(() => {
    setJSONResponses([]);
  }, [jobPosition]);

  const GetQuestions = async (e) => {
    e.preventDefault ();
    e.stopPropagation();
    setLoadings(true);
    try {
      const result = await chatSession.sendMessage(questionsPrompt);
      let geminiResponse = await result.response.text();
      console.log('Raw response:', geminiResponse); // Log the raw response

      // Clean the response by removing code block markers and trimming
      geminiResponse = geminiResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      console.log('Cleaned response:', geminiResponse); // Log the cleaned response

      // Additional sanitization to handle potential formatting issues
      geminiResponse = geminiResponse.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']'); // Remove trailing commas

      try {
        const parsedResponse = JSON.parse(geminiResponse);
        console.log('Parsed response:', parsedResponse); // Log the parsed response
        setJSONResponses(parsedResponse);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        // Optionally handle the parsing error, e.g., show a user-friendly message
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Optionally handle the fetch error, e.g., show a user-friendly message
    } finally {
      setLoadings(false);
    }
  }

  const clearAllData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setJSONResponses([]);
    setJobPosition('');
    setLoadings(false);
  }
  return (
   
    <div className='md:p-10 p-2 h-screen'>
      <h2 className='text-center md:text-2xl text-xl font-bold'>Generate Question and Answer for Your Job Position</h2>
      <div className='mt-5 flex  justify-center  p-3'>
        <form onSubmit={GetQuestions}>
          <div className='flex items-center flex-wrap gap-5'>
            <Input
              placeholder="Your Job Position"
              value={jobPosition}
              type="text"
              onChange={(e) => setJobPosition(e.target.value)}
            />
            <Input
              value={questionQuentity}
              type="number"
              onChange={(e) => setQuestionQuentity(e.target.value)}
            />
            <Button
              className='bg-blue-700 hover:bg-blue-600'
              type="submit"
              disabled={loadings || jobPosition === ''}>
              {loadings ? (
                <>
                  <LoaderCircle className='animate-spin' /> Generating from AI
                </>
              ) : 'Generate'}
            </Button>

            <Button
              disabled={jobPosition?.length >0 ? true : false}
              type="button"
              onClick={clearAllData}
              className='bg-red-600 hover:bg-red-500'>
              Clear
            </Button>
          </div>
        </form>
      </div>
      <hr />
      <div>
        {jsonResponses.length > 0 && jsonResponses.map((qa, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className='p-3 border rounded-xl mt-3 text-sm font-semibold flex items-center gap-2 bg-slate-100'>
              {index + 1}. {qa.question} <ChevronsUpDown />
            </CollapsibleTrigger>
            <CollapsibleContent className='p-3 border rounded-xl bg-slate-200 mt-1'>
              <p>{qa.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}

export default Page;
