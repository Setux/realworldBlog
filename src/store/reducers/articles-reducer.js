const initialState = {
    data: [],
    selectedArticle: null,
    totalArticles: null,
    currentPage: null,
    isLoading: false,
};

export default function  articlesReducer (state = initialState, { type, payload }) {
    const { isLoading } = state;
    switch (type) {
        case 'SET_DATA':
            return {
                ...state,
                data: payload.articles,
                selectedArticle: null,
                totalArticles: payload.articlesCount,
            };
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: payload,
            };
        case 'SET_ARTICLE':
            return {
                ...state,
                data: [],
                selectedArticle: payload,
            };
        case 'ON_LOAD':
            return {
                ...state,
                isLoading: !isLoading,
            };
        default:
            return state;
    }
};