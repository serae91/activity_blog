package com.example.auth;

import backend.user.core.UserService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @POST
    @Path("/register")
    public Response register(UserDTO dto) {
        userService.register(dto.username, dto.password);
        return Response.ok().build();
    }

    @POST
    @Path("/login")
    public Response login(UserDTO dto) {
        if (userService.authenticate(dto.username, dto.password)) {
            // Hier kannst du JWT erzeugen
            String token = JwtUtils.generateToken(dto.username);
            return Response.ok(new TokenDTO(token)).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
