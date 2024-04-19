import { QuestionType } from '../types';
import Card from 'react-bootstrap/Card';

type QuestionCardProps = {
    question: QuestionType
}

export default function PostCard({ question }: QuestionCardProps) {
    
    return (
        <Card className='my-3 bg-custom' text='white'>
            <Card.Header>{ question.created_on }</Card.Header>
            <Card.Body>
                <Card.Title>{ question.question }</Card.Title>
                <Card.Subtitle>{ question.author }</Card.Subtitle>
                <Card.Text>{ question.answer }</Card.Text>
            </Card.Body>
        </Card>
    )
}