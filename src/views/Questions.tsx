import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCard from '../components/QuestionCard';
import QuestionForm from '../components/QuestionForm';
import {getUserQuestions, createQuestion} from '../lib/apiWrapper';
import { type } from '../types/index';

type QuestionsProps = {
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void,
    handleClick: () => void
}
export default function Questions({currentUser, flashMessage, handleClick}: QuestionsProps) { 
    const [showForm, setShowForm] = useState(false);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [fetchQuestionData, setFetchQuestionData] = useState(true);
    useEffect(() => {
        async function fetchData(){
            const token = localStorage.getItem('token');
            if(token){
            const response = await getUserQuestions(token);
            if (response.data){
                let questions = response.data;
                setQuestions(questions.questions)
            }
        }
        }
        fetchData();
    }, [fetchQuestionData]);

    return (
        <>
        <h1 className="text-center">Your Questions</h1>
       
        {questions.map((question) => <QuestionCard key={question.id} question={question} isAuthor={true}/>)}
        </>
    )
}
