import saga from './Weather/saga'
export default function* rootSaga () {
    yield saga()
}
