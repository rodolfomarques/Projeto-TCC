import { render, screen } from "@testing-library/react";
import PlaceCard from "../../components/PlaceCard/PlaceCard";


describe("<PlaceCard />", () => {

    it('renderiza o card corretamente', () => {

        render(<PlaceCard />)
        const button = screen.queryByText('ver mais')

        expect(button).toBeInTheDocument;

    })

})