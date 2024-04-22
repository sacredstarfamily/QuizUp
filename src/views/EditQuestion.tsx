import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteQuestionById, editQuestionById, getAllQuizQs } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CategoryType, QuestionFormDataType, UserType } from '../types';

type EditQuestionProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: UserType|null
   
}

export default function EditQuestion({ flashMessage, currentUser }: EditQuestionProps) {
    const { questionId } = useParams();
    const navigate = useNavigate();

    const [questionToEditData, setQuestionToEditData] = useState<QuestionFormDataType>({question: '', answer: ''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    useEffect( () => {
        async function getQuestion(){
            let response = await getAllQuizQs();
            if (response.data){
                const questions = response.data.questions
                const question = questions.find((q) => q.id === parseInt(questionId));
                const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}')
                console.log(question);
                    setQuestionToEditData({question: question.question, answer: question.answer})
                
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        }

        getQuestion()
    }, [questionId, currentUser, flashMessage, navigate] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestionToEditData({...questionToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editQuestionById(token,questionId, questionToEditData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.question} has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteQuestionById( token,questionId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data}`, 'primary')
            navigate('/')
        }
    }

    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit Post</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Question</Form.Label>
                        <Form.Control name='question' placeholder='Edit Question' value={questionToEditData.question} onChange={handleInputChange} />
                        <Form.Label>Question Answer</Form.Label>
                        <Form.Control as='textarea' name='answer' placeholder='Edit Question Answer' value={questionToEditData.answer} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit Question</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Post</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {questionToEditData.question}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {questionToEditData.question}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}