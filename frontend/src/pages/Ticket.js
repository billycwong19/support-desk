import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, reset as notesReset } from '../features/notes/noteSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import NoteItem from '../components/NoteItem'

const Ticket = () => {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        
        dispatch(getTicket(params.ticketId))
        dispatch(getNotes(params.ticketId))
        // eslint-disable-next-line
    }, [isError, params.ticketId, message])

    const onTicketClose = () => {
        dispatch(closeTicket(params.ticketId))
        toast.success('ticket closed!')
        navigate('/tickets')
    }

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h3>Something went wrong...</h3>
    }

  return (
    <div className='ticket-page'>
        <header className='ticket-header'>
            <BackButton url='/tickets' />
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>
                Date submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
            </h3>
            <h3>
                Product: {ticket.product}
            </h3>
            <hr/>
            <div className='ticket-desc'>
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
        </header>

        { notes.map(note => (
            <NoteItem key={note._id} note={note} />
        ))}

        { ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket