import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCard from '../components/QuestionCard';

import {  QuestionType } from '../types';
import { getAllQuizQs } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: QuestionType, b:QuestionType) => number,
    idDesc: (a: QuestionType, b:QuestionType) => number,
    questionAsc: (a: QuestionType, b:QuestionType) => number,
    questionDesc: (a: QuestionType, b:QuestionType) => number,
}


type HomeProps = {
   
    handleClick: () => void
}

export default function Home({ handleClick}: HomeProps) {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        console.log('Hello World')
        async function fetchData(){
            const response = await getAllQuizQs();
            if (response.data){
                // eslint-disable-next-line prefer-const
                let questions = response.data;
                console.log(questions.questions)
                setQuestions(questions.questions)
            }
        }

        fetchData();
    }, [])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:QuestionType, b:QuestionType) => a.id - b.id,
            idDesc: (a:QuestionType, b:QuestionType) => b.id - a.id,
            questionAsc: (a:QuestionType, b:QuestionType) => a.question > b.question ? 1 : -1,
            questionDesc: (a:QuestionType, b:QuestionType) => b.question > a.question ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...questions].sort(func);
        setQuestions(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

 

    return (
        <>
           
                <Button variant='primary' onClick={handleClick}>Click Me!</Button>
                
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                    </Col>
                    <Col>
                       {/*  <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By ID ASC</option>
                            <option value="idDesc">Sort By ID DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select> */}
                    </Col>
                    <Col>
                      {/*   <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Post+'}</Button> */}
                    </Col>
                </Row>
              {/*   { showForm && <PostForm addNewPost={addNewPost} /> } */}
                { questions.filter(p => p.author.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <QuestionCard key={p.id} question={p} /> )}
        </>
    )
}