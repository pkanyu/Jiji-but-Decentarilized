import './AuctionDetail.scss';
import { useEffect, useState } from "react";
import { AuctionDetails, Item } from "../declarations/backend/backend.did";
import { backend } from "../declarations/backend";
import { useParams } from "react-router-dom";
import { getImageSource } from './common';
import { AuthClient } from '@dfinity/auth-client';

/**
 * Renders the auction detail page.
 */
function AuctionDetail() {
    const { id } = useParams();
    const auctionId = BigInt(id as string);

    /**
     * State variables for the auction detail page.
     */
    const [auctionDetails, setAuctionDetails] = useState<AuctionDetails | undefined>();
    const [newPrice, setNewPrice] = useState(0);
    const [lastError, setLastError] = useState<string | undefined>(undefined);
    const [saving, setSaving] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    /**
     * Fetches the auction details from the backend and sets the state.
     */
    const fetchFromBackend = async () => {
        setAuctionDetails(await backend.getAuctionDetails(auctionId));
        const authClient = await AuthClient.create();
        setAuthenticated(await authClient.isAuthenticated());
    };

    /**
     * Sets up an interval to fetch the auction details every second.
     */
    useEffect(() => {
        fetchFromBackend();
        setInterval(fetchFromBackend, 1000);
    }, [auctionId]);

    /**
     * Makes a new bid on the auction.
     */
    const makeNewOffer = async () => {
        try {
            setSaving(true);
            await backend.makeBid(auctionId, BigInt(newPrice));
            setLastError(undefined);
            setNewPrice(newPrice + 1);
            fetchFromBackend();
        } catch (error: any) {
            const errorText: string = error.toString();
            if (errorText.indexOf("Price too low") >= 0) {
                setLastError("Price too low");
            } else if (errorText.indexOf("Auction closed") >= 0) {
                setLastError("Auction closed");
            } else {
                setLastError(errorText);
            }
            return;
        } finally {
            setSaving(false);
        }
    };

    /**
     * Renders the bid history table.
     */
    const historyElements = auctionDetails?.bidHistory.map(bid =>
        <tr key={+bid.price.toString()}>
            <td>
                {bid.price.toString()} ICP
            </td>
            <td>
                {bid.time.toString()} seconds
            </td>
            <td>
                {bid.originator.toString()}
            </td>
        </tr>
    );

    /**
     * Returns the last bid in the auction history.
     */
    const getLastBid = () => {
        if (auctionDetails == null) {
            return null;
        }
        let history = auctionDetails.bidHistory;
        if (history.length == 0) {
            return null;
        }
        return history[history.length - 1];
    }

    /**
     * Sets the new bid price to the next highest value if the price is zero.
     */
    if (newPrice == 0) {
        const currentBid = getLastBid();
        const proposedPrice = currentBid == null ? 1 : +currentBid.price.toString() + 1;
        setNewPrice(proposedPrice);
    }

    /**
     * Handles the input for the new bid price.
     */
    const handleNewPriceInput = (input: string) => {
        try {
            const value = parseInt(input);
            if (value >= 0) {
                setNewPrice(value);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Renders the auction item details.
     */
    const displayItem = (item: Item) => {
        return (
            <>
                <h1>{item.title}</h1>
                <div className="auction-overview">
                    <div className="overview-description">{item.description}</div>
                    {!!item.image?.length && (
                        <div className="overview-image"><img src={getImageSource(item.image)} alt="Auction image" /></div>
                    )}
                </div>
            </>
        );
    }

    /**
     * Renders the bid history section.
     */
    const showHistory = () => {
        return (<div className="section">
            <h2>History</h2>
            <table className='bid-table'>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Time after start</th>
                        <th>Originator</th>
                    </tr>
                </thead>
                <tbody>
                    {historyElements}
                </tbody>
            </table>
        </div>
        );
    }

    /**
     * Renders the bid form if the user is authenticated.
     */
    const showBidForm = () => {
        if (!authenticated) {
            return (<h2 className="error-message">Need to sign in to buy and bid</h2>);
        }
        return (
            <div className="section">
                <h2>New Bid</h2>
                <h3>Remaining time: {auctionDetails?.remainingTime.toString()}</h3>
                <div className="bid-form">
                    <input type="number" value={newPrice} onChange={(e) => handleNewPriceInput(e.target.value)} />
                    <button onClick={makeNewOffer} disabled={saving} style={{ opacity: saving ? 0.5 : 1 }}>
                        Bid {newPrice} ICP
                    </button>
                </div>
                {lastError != null &&
                    <p className="error-message">{lastError}</p>
                }
            </div>
        );
    }

    /**
     * Renders the auction details section.
     */
    const showAuction = () => {
        if (auctionDetails == null) {
            throw Error("undefined auction");
        }
        const currentBid = getLastBid();
        return (
            <>
                {displayItem(auctionDetails.item)}
                {
                    currentBid != null &&
                    <div className="section">
                        <h2>{isClosed ? "Final Deal" : "Current Bid"}</h2>
                        <p className="main-price">{currentBid.price.toString()} ICP</p>
                        <p>by {currentBid.originator.toString()}</p>
                        <p>{currentBid.time.toString()} seconds after start</p>
                    </div>
                }
                {!isClosed &&
                    showBidForm()
                }
                {showHistory()}
            </>
        );
    }

    /**
     * Returns true if the auction is closed.
     */
    const isClosed = auctionDetails != null && +auctionDetails.remainingTime.toString() == 0;

    return (
        <>
            {auctionDetails == null ?
                <div className="section text-warning">Loading</div>
                :
                showAuction()
            }
        </>
    );
}

export default AuctionDetail;
