import styled from "styled-components";

export const Wrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-self: center;
    /* margin-top: 5rem; */
    width: 380px;
    height: 400px;
    /* margin: 0 37%; */
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    border-radius: 2rem;
    margin-top: 5rem;

    & h1 {
        font-size: 1.5rem;
    }

    & img {
        margin: 3rem 0;
        width: 100px;
        border-radius: 50%;
    }

    & svg {
        vertical-align: 20%;
    }
`