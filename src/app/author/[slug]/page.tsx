import Hero from '@/components/author/Hero'
import MoreBlogs from '@/components/blogDets/MoreBlogs'
import PageWrapper from '@/components/PageWrapper'

const AuthorPage = () => {
    return (
        <PageWrapper>
            <Hero />
            <MoreBlogs title="More Insights from Cyrus Karai" />
        </PageWrapper>
    )
}

export default AuthorPage
