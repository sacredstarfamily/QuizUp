import { QuestionType } from '../types';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
type QuestionCardProps = {
    question: QuestionType
    isAuthor: boolean
}

export default function QuestionCard({ question, isAuthor }: QuestionCardProps) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [isauthor] = useState(isAuthor);
    return (
        <Card className='my-3 bg-custom' text='black'>
            <Card.Header>{ question.created_on }</Card.Header>
            <Card.Body>
                <Card.Title>{ question.question }</Card.Title>
                <Card.Subtitle>Created By: { question.author }</Card.Subtitle>
                <Button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Button>
                {isauthor && <Link to={`/edit/${question.id}`}><Button variant='primary'>Edit Post</Button></Link>}
                {showAnswer && <Card.Text>The answer is: { question.answer }</Card.Text>}
            </Card.Body>
        </Card>
    )
}