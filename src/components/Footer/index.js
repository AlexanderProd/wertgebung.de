import React from 'react'

import { useSiteMetadata } from '../../utils/hooks'
import { Container, InternalLink, ExternalLink } from '../../utils/styles'
import { Wrapper, SocialMediaLinks } from './styles'
import { Instagram, Facebook, Pinterest, LinkedIn } from '../ui/icons'

const Footer = ({ color = 'black' }) => {
  const { title, socialLinks } = useSiteMetadata()

  const getSocialMediaIcon = (name, color) => {
    switch (name.toLowerCase()) {
      case 'instagram':
        return <Instagram color={color} height="18px" />

      case 'facebook':
        return <Facebook color={color} height="18px" />

      case 'pinterest':
        return <Pinterest color={color} height="18px" />

      case 'linkedin':
        return <LinkedIn color={color} height="18px" />

      default:
        break
    }
  }

  return (
    <Container>
      <Wrapper>
        <div>
          <h4>Office Nürnberg</h4>
          <address>
            Wertgebung
            <br /> Steilstraße 1A
            <br /> 90513 Zirndorf
            <br /> Germany
          </address>
        </div>

        <div>
          <h4>Office Berlin</h4>
          <address>
            Wertgebung
            <br /> Weißenseer Weg 37
            <br /> 13055 Berlin
            <br /> Germany
          </address>
        </div>

        <div>
          <ExternalLink
            href="/AGB.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            AGB
          </ExternalLink>
          <br />
          <InternalLink to="/impressum">Impressum</InternalLink>
          <br />© {new Date().getFullYear()} {title}
        </div>

        <SocialMediaLinks color={color}>
          {socialLinks.map(({ name, link }) => {
            return (
              <li key={name}>
                {getSocialMediaIcon(name, color)}
                <ExternalLink
                  href={link}
                  key={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </ExternalLink>
              </li>
            )
          })}
        </SocialMediaLinks>
      </Wrapper>
    </Container>
  )
}

export default Footer
